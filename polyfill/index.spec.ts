import ".";
import { users, vehicles } from "./constants";

describe("Array.prototype.filterGroups", () => {
  describe("Error cases", () => {
    it("Should throw a TypeError if no callback is provided", () => {
      // @ts-ignore
      expect(() => vehicles.filterGroups()).toThrow(
        new TypeError("At least one callback must be provided")
      );
    });

    it("Should throw a TypeError if there is a non-function in callbacks", () => {
      expect(() =>
        vehicles.filterGroups(
          () => true,
          () => true,
          // @ts-ignore
          1,
          () => true
        )
      ).toThrow(new TypeError("All callbacks must be functions"));

      expect(() =>
        vehicles.filterGroups(
          () => true,
          () => true,
          // @ts-ignore
          "type",
          () => true
        )
      ).toThrow(new TypeError("All callbacks must be functions"));

      expect(() =>
        vehicles.filterGroups(
          () => true,
          () => true,
          // @ts-ignore
          true,
          () => true
        )
      ).toThrow(new TypeError("All callbacks must be functions"));

      expect(() =>
        vehicles.filterGroups(
          () => true,
          () => true,
          // @ts-ignore
          {},
          () => true
        )
      ).toThrow(new TypeError("All callbacks must be functions"));
    });
  });

  describe("Success cases", () => {
    it("Should filter the vehicle groups by type", () => {
      const [sedanVehicles, hatchVehicles, suvVehicles, otherVehicles] =
        vehicles.filterGroups(
          vehicle => vehicle.type === "sedan",
          vehicle => vehicle.type === "hatch",
          vehicle => vehicle.type === "suv"
        );

      expect(sedanVehicles).toEqual([
        { name: "Toyota Corolla", type: "sedan" },
        { name: "Honda Civic", type: "sedan" }
      ]);

      expect(hatchVehicles).toEqual([
        { name: "Honda Fit", type: "hatch" },
        { name: "Toyota Etios", type: "hatch" }
      ]);

      expect(suvVehicles).toEqual([
        { name: "Honda CRV", type: "suv" },
        { name: "Toyota SW4", type: "suv" }
      ]);

      expect(otherVehicles).toEqual([
        { name: "Honda Odyssey", type: "van" },
        { name: "Toyota Dyna", type: "truck" }
      ]);
    });

    it("Should filter the user groups by status name", () => {
      const [activeUsers, inactiveUsers] = users.filterGroups(
        user => user.status.name === "active"
      );

      expect(activeUsers).toEqual([
        { name: "Oliver", status: { name: "active" } },
        { name: "Thomas", status: { name: "active" } }
      ]);

      expect(inactiveUsers).toEqual([
        { name: "Henry", status: { name: "inactive" } }
      ]);
    });

    it("Should filter the user groups by name length (preference for the first callbacks)", () => {
      const [usersWithName, usersWithStatusName] = users.filterGroups(
        user => user.name.length > 0,
        user => user.status.name.length > 0
      );

      expect(usersWithName).toEqual([
        { name: "Oliver", status: { name: "active" } },
        { name: "Henry", status: { name: "inactive" } },
        { name: "Thomas", status: { name: "active" } }
      ]);

      expect(usersWithStatusName).toEqual([]);
    });
  });
});
