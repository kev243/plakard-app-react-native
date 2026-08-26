const { withEntitlementsPlist } = require("@expo/config-plugins");

/**
 * Plakard schedules notifications locally and does not use APNs.
 * Removing this entitlement lets a free Apple Personal Team sign the app.
 */
module.exports = function withLocalNotificationsOnly(config) {
  return withEntitlementsPlist(config, (configWithEntitlements) => {
    delete configWithEntitlements.modResults["aps-environment"];
    return configWithEntitlements;
  });
};
