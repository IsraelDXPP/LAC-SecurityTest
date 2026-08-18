import * as fs from "fs";
import * as path from "path";

describe("Vulnerability Data", () => {
  const vulnsPath = path.join(__dirname, "..", "data", "vulns.json");
  let vulns: any[];

  beforeAll(() => {
    vulns = JSON.parse(fs.readFileSync(vulnsPath, "utf-8"));
  });

  test("should load vulnerabilities from JSON", () => {
    expect(vulns).toBeDefined();
    expect(Array.isArray(vulns)).toBe(true);
    expect(vulns.length).toBeGreaterThan(0);
  });

  test("should have 33 vulnerabilities", () => {
    expect(vulns.length).toBe(33);
  });

  test("each vulnerability should have required fields", () => {
    vulns.forEach((vuln) => {
      expect(vuln).toHaveProperty("id");
      expect(vuln).toHaveProperty("title");
      expect(vuln).toHaveProperty("description");
      expect(vuln).toHaveProperty("severity");
      expect(vuln).toHaveProperty("category");
      expect(vuln).toHaveProperty("methods");
      expect(vuln).toHaveProperty("impact");
      expect(vuln).toHaveProperty("fix");
    });
  });

  test("should have valid severity levels", () => {
    const validSeverities = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];
    vulns.forEach((vuln) => {
      expect(validSeverities).toContain(vuln.severity);
    });
  });

  test("should have valid categories", () => {
    const validCategories = [
      "Player",
      "Vehicle",
      "Network",
      "Editor",
      "Game State",
      "RP System",
    ];
    vulns.forEach((vuln) => {
      expect(validCategories).toContain(vuln.category);
    });
  });

  test("should have valid methods", () => {
    const validMethods = [
      "Mirror",
      "Photon",
      "Colyseus",
      "Unity",
      "HTTP/WS",
      "PlayerPrefs",
      "Addressables",
      "ScriptableObjects",
      "Events",
    ];
    vulns.forEach((vuln) => {
      vuln.methods.forEach((method) => {
        expect(validMethods).toContain(method);
      });
    });
  });

  test("should have CVSS scores where applicable", () => {
    vulns.forEach((vuln) => {
      if (vuln.impact?.cvss !== undefined) {
        expect(vuln.impact.cvss).toBeGreaterThanOrEqual(0);
        expect(vuln.impact.cvss).toBeLessThanOrEqual(10);
      }
    });
  });

  test("should have exploit difficulty ratings", () => {
    vulns.forEach((vuln) => {
      expect(vuln.impact?.exploitDifficulty).toBeDefined();
      expect(typeof vuln.impact.exploitDifficulty).toBe("string");
    });
  });

  describe("Severity Distribution", () => {
    test("should have 5 CRITICAL vulnerabilities", () => {
      const critical = vulns.filter((v) => v.severity === "CRITICAL");
      expect(critical.length).toBe(5);
    });

    test("should have 9 HIGH vulnerabilities", () => {
      const high = vulns.filter((v) => v.severity === "HIGH");
      expect(high.length).toBe(9);
    });

    test("should have 9 MEDIUM vulnerabilities", () => {
      const medium = vulns.filter((v) => v.severity === "MEDIUM");
      expect(medium.length).toBe(9);
    });

    test("should have 10 LOW vulnerabilities", () => {
      const low = vulns.filter((v) => v.severity === "LOW");
      expect(low.length).toBe(10);
    });
  });
});
