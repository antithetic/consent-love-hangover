import { Settings } from "lucide-react";
import { defineField, defineType } from "sanity";

export const settingsPage = defineType({ 
    name: 'settings',
    title: 'Site Settings',
    type: 'document',
    icon: Settings,
    options: {
        // singleton: true,
    },
    fields: [
        defineField({
            name: 'title',
            title: 'title',
            type:'string',

        })
    ]

})