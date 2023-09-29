interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: [
    'Business Owner',
    'Operations Manager',
    'Customer Service Representative',
    'Operations Staff',
    'End Customer',
  ],
  tenantName: 'Company',
  applicationName: 'B2C Car sharing',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage company information', 'Manage car inventory', 'Manage bookings', 'Manage dashboard'],
  getQuoteUrl: 'https://app.roq.ai/proposal/c96e94f2-eff2-46f7-af4d-a19b5976aba7',
};
