import { CollectionConfig } from "payload";

import { Users } from "./Users";
import { Media } from "./Media";
import { Subscribers } from "./Subscribers";
import { Tags } from "./Tags";
import { Settings } from "./Settings";
import { Campaigns } from "./Campaigns";

export const collections: CollectionConfig[] = [
    Campaigns,
    Media,
    Settings,
    Subscribers,
    Tags,
    Users,
];

