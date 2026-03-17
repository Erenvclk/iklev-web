import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    try {
      const publicRole = await strapi
        .query('plugin::users-permissions.role')
        .findOne({ where: { type: 'public' }, populate: ['permissions'] });

      if (!publicRole) {
        strapi.log.warn('Public role not found');
        return;
      }

      const permissionsToEnable = [
        'api::announcement.announcement.find',
        'api::announcement.announcement.findOne',
        'api::board-member.board-member.find',
        'api::static-page.static-page.find',
        'api::static-page.static-page.findOne',
        'api::site-setting.site-setting.find',
        'api::hero-slide.hero-slide.find',
      ];

      const existingActions = (publicRole.permissions || []).map(
        (p: { action: string }) => p.action
      );

      for (const action of permissionsToEnable) {
        if (!existingActions.includes(action)) {
          await strapi.query('plugin::users-permissions.permission').create({
            data: {
              action,
              role: publicRole.id,
            },
          });
          strapi.log.info(`Permission added: ${action}`);
        }
      }

      strapi.log.info('Bootstrap: public permissions OK');
    } catch (err) {
      strapi.log.error('Bootstrap permission error:', err);
    }
  },
}; 