import type { Core } from '@strapi/strapi';

const PUBLIC_PERMISSIONS = {
  'api::announcement.announcement': ['find', 'findOne'],
  'api::board-member.board-member': ['find'],
  'api::static-page.static-page': ['find', 'findOne'],
  'api::site-setting.site-setting': ['find'],
  'api::hero-slide.hero-slide': ['find'],
};

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    for (const [uid, actions] of Object.entries(PUBLIC_PERMISSIONS)) {
      for (const action of actions) {
        const existingPermission = await strapi
          .query('plugin::users-permissions.permission')
          .findOne({ where: { role: publicRole.id, action: `${uid}.${action}` } });

        if (!existingPermission) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              role: publicRole.id,
              action: `${uid}.${action}`,
            },
          });
        }
      }
    }

    strapi.log.info('Public permissions set successfully.');
  },
};