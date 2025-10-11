import { InstructionItem } from "src/components/post/InstructionItem";

export function InstructionsCollection({ instructions, onSave, onDelete, onChangeMode }) {
  return (
    <div className="w-full pl-2 mx-auto mt-3">
      <ol className="w-full pl-4 space-y-2 list-decimal text-yellow200 md:space-y-4">
        {(instructions ?? []).map((instruction) => {
          return (
            <li key={instruction.id}>
              <InstructionItem
                instruction={instruction}
                key={instruction.id}
                onSave={({ id, title }) => onSave?.({ id, title })}
                onDelete={(id) => onDelete?.(id)}
                onChangeMode={({ id, isEdit }) => onChangeMode?.({ id, isEdit })}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
