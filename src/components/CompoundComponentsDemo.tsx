import { useState } from "react";
import HeadingWithAnchor from "./HeadingWithAnchor";
import FlexibleCard from "./FlexibleCard";
import { allKitchenItems, KitchenItem } from "./kitchenItems";
import Select from "./Select";
import ButtonGroup from "./ButtonGroup";

const categoryStyle: Record<KitchenItem["category"], string> = {
  organic: "bg-green-100 text-green-800 border-green-300",
  tool: "bg-purple-100 text-purple-800 border-purple-300",
  random: "bg-gray-100 text-gray-500 border-gray-300",
};

const categoryLabel: Record<KitchenItem["category"], string> = {
  organic: "Organic",
  tool: "Tool",
  random: "Doesn't belong here...",
};

export default function CompoundComponentsDemo() {
  const [selected, setSelected] = useState(allKitchenItems[0].value);
  const [animal, setAnimal] = useState("dog");

  const selectedItem = allKitchenItems.find((i) => i.value === selected)!;

  return (
    <div className="space-y-4">
      <HeadingWithAnchor id="compound-components-pattern" level={2}>
        Compound components pattern
      </HeadingWithAnchor>

      {/* ── Static example: each option has totally different markup ── */}
      <FlexibleCard title="Static example — each option has completely different formatting">
        <p className="text-sm text-gray-500 mb-3">
          Same <code>{"<Select>"}</code> + <code>{"<Select.Option>"}</code>{" "}
          pattern. The parent doesn't know or care how each option looks.
        </p>
        <Select
          value={animal}
          onChange={setAnimal}
          placeholder="Pick an animal…"
        >
          {/* Green "Popular" badge */}
          <Select.Option value="dog">
            🐶 Dog{" "}
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-green-100 text-green-700 border border-green-300">
              Popular
            </span>
          </Select.Option>

          {/* Bold + orange */}
          <Select.Option value="lion">
            <span className="font-bold text-orange-600">🦁 Lion</span>
          </Select.Option>

          {/* Italic + teal */}
          <Select.Option value="parrot">
            <span className="italic text-teal-600">
              🦜 Parrot — tropical bird
            </span>
          </Select.Option>

          {/* Purple "Rare" badge */}
          <Select.Option value="octopus">
            🐙 Octopus{" "}
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700 border border-purple-300">
              Rare
            </span>
          </Select.Option>

          {/* Small eco tag */}
          <Select.Option value="frog">
            🐸 Frog{" "}
            <span
              className="ml-1 px-1.5 py-0.5 text-xs rounded bg-lime-100 text-lime-700 border border-lime-300"
              title="Endangered species"
            >
              🌿 Eco
            </span>
          </Select.Option>

          {/* Disabled + coming soon */}
          <Select.Option value="hedgehog" disabled>
            🦔 Hedgehog{" "}
            <span className="ml-1 px-1.5 py-0.5 text-xs rounded bg-gray-100 text-gray-400 border border-gray-200 italic">
              Coming soon
            </span>
          </Select.Option>
        </Select>
        <p className="mt-3 text-sm text-gray-500">
          Selected: <strong>{animal}</strong>
        </p>
      </FlexibleCard>

      {/* ── Dynamic example: map over data ── */}
      <FlexibleCard title="Each option renders differently based on its data — compound components make this clean">
        <p className="text-sm text-gray-500 mb-3">
          🟢 Organic &nbsp; 🟣 Kitchen tool &nbsp; ⚪ Doesn't belong here...
        </p>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-2">
              As a dropdown <code>{"<Select>"}</code>:
            </p>
            <Select value={selected} onChange={setSelected}>
              {allKitchenItems.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${categoryStyle[item.category]}`}
                  >
                    {item.emoji} {item.name}
                    {item.comingSoon && (
                      <span className="ml-1 italic">soon</span>
                    )}
                  </span>
                </Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">
              Same data as buttons <code>{"<ButtonGroup>"}</code>:
            </p>
            <ButtonGroup value={selected} onChange={setSelected}>
              {allKitchenItems.map((item) => (
                <ButtonGroup.Option key={item.value} value={item.value}>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border ${
                      selected === item.value
                        ? ""
                        : categoryStyle[item.category]
                    }`}
                  >
                    {item.emoji} {item.name}
                    {item.comingSoon && (
                      <span className="ml-1 italic">soon</span>
                    )}
                  </span>
                </ButtonGroup.Option>
              ))}
            </ButtonGroup>
          </div>
        </div>

        <div
          className={`mt-4 p-3 rounded border text-sm ${categoryStyle[selectedItem.category]}`}
        >
          <strong>
            {selectedItem.emoji} {selectedItem.name}
          </strong>{" "}
          — {categoryLabel[selectedItem.category]}
          {selectedItem.comingSoon && (
            <span className="ml-2 italic text-xs">(coming soon)</span>
          )}
        </div>
      </FlexibleCard>
    </div>
  );
}
