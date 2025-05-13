import { InstructionItem } from "src/components/post/InstructionItem";

export function InstructionsCollection({ instructions, onSave, onDelete, onChangeMode }) {
  return (
    <div className="mx-auto mt-3 w-full pl-2">
      <ol className="w-full list-decimal space-y-2 pl-4 text-yellow200 md:space-y-4">
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
