import { Service } from "../../redux/profileAndProductsSlice";

export const appsConfig: Service = {
  BTB_APPSTORE: {
    serviceName: "BT Business app",
    serviceDescription:
      "View bills, set up and manage devices, check service status, speed and much more.",
    externalLink: "https://business.bt.com/comms/business-app/",
    buttonText: "More about BT Business app",
    icon: "",
  },
  BTCLOUDVOICESERVICE: {
    serviceName: "Cloud Voice Express app",
    serviceDescription:
      "All the apps you need for increased security, storage, support and more. All paid for through your regular BT Business bill.",
    externalLink: "http://vel-eric-e2e-ukb.nat.bt.com/",
    buttonText: "Launch now",
    icon: "",
  },
  EE_REFERENCE: {
    serviceName: "My EE app",
    serviceDescription: "",
    externalLink: "https://business.bt.com",
    buttonText: "",
    icon: "",
  },
};
