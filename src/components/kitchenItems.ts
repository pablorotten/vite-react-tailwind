export type KitchenItem = {
  value: string;
  name: string;
  emoji: string;
  category: "organic" | "tool" | "random";
  comingSoon?: boolean;
};

export const allKitchenItems: KitchenItem[] = [
  { value: "onion", name: "Onion", emoji: "🧅", category: "organic" },
  { value: "apple", name: "Apple", emoji: "🍎", category: "organic" },
  { value: "garlic", name: "Garlic", emoji: "🧄", category: "organic" },
  { value: "tomato", name: "Tomato", emoji: "🍅", category: "organic" },
  { value: "lemon", name: "Lemon", emoji: "🍋", category: "organic" },
  { value: "knife", name: "Knife", emoji: "🔪", category: "tool" },
  { value: "pan", name: "Pan", emoji: "🍳", category: "tool" },
  { value: "spatula", name: "Spatula", emoji: "🥄", category: "tool" },
  {
    value: "whisk",
    name: "Whisk",
    emoji: "🥣",
    category: "tool",
    comingSoon: true,
  },
  { value: "remote", name: "TV Remote", emoji: "📺", category: "random" },
  { value: "shoe", name: "Shoe", emoji: "👟", category: "random" },
  { value: "charger", name: "Phone Charger", emoji: "🔌", category: "random" },
];
