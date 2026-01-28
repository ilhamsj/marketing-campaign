import { CollectionConfig } from "payload";

import { Users } from "./Users";
import { Media } from "./Media";
import { Subscribers } from "./Subscribers";

const collections: CollectionConfig[] = [
    Users,
    Media,
    Subscribers,
];

export default collections;
