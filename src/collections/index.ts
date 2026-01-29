import { CollectionConfig } from "payload";
import { Campaigns } from "./Campaigns";
import { CampaignsTemplates } from "./CampaignsTemplates";
import { Media } from "./Media";
import { Settings } from "./Settings";
import { Subscribers } from "./Subscribers";
import { Tags } from "./Tags";
import { Users } from "./Users";

export const collections: CollectionConfig[] = [
    Campaigns,
    CampaignsTemplates,
    Media,
    Settings,
    Subscribers,
    Tags,
    Users,
];

