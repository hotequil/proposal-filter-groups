type Vehicle = {
  name: string;
  type: "sedan" | "hatch" | "suv" | "van" | "truck";
};

export const vehicles: Vehicle[] = [
  { name: "Toyota Corolla", type: "sedan" },
  { name: "Honda Fit", type: "hatch" },
  { name: "Honda Civic", type: "sedan" },
  { name: "Honda CRV", type: "suv" },
  { name: "Toyota Etios", type: "hatch" },
  { name: "Honda Odyssey", type: "van" },
  { name: "Toyota Dyna", type: "truck" },
  { name: "Toyota SW4", type: "suv" }
];

type User = {
  name: string;
  status: {
    name: "active" | "inactive";
  };
};

export const users: User[] = [
  { name: "Oliver", status: { name: "active" } },
  { name: "Henry", status: { name: "inactive" } },
  { name: "Thomas", status: { name: "active" } }
];
