import ValueComparison from "../features/value-comparison";

export default async function HomePage() {
  return (
    <div>
      <ValueComparison />
    </div>
  );
}

export const getConfig = async () => {
  return {
    render: "static",
  } as const;
};
