const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://smart-vehicle-access-1ba6f-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.database();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   HOME
========================= */
app.get("/", (req, res) => {
  res.send("Backend Running 🔥");
});

/* =========================
   INITIAL FIREBASE SETUP
========================= */
app.get("/setup", async (req, res) => {
  try {
    await db.ref("/users").set({});
    await db.ref("/vehicles").set({});
    await db.ref("/logs").set({});
    await db.ref("/alerts").set({});

    res.send("Firebase Structure Created ✅");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* =========================
   ADD ADMIN USER
========================= */
app.get("/add-admin", async (req, res) => {
  try {
    await db.ref("/users/admin001").set({
      name: "Judah",
      email: "judah@gmail.com",
      role: "admin",
      rfid_uid: "A1B2C3D4",
    });

    res.send("Admin Added ✅");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* =========================
   ADD NORMAL USER
========================= */
app.get("/add-user", async (req, res) => {
  try {
    await db.ref("/users/user001").set({
      name: "Operator One",
      email: "operator@gmail.com",
      role: "operator",
      rfid_uid: "X9Y8Z7",
    });

    res.send("User Added ✅");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* =========================
   ADD VEHICLE
========================= */
app.get("/add-vehicle", async (req, res) => {
  try {
    await db.ref("/vehicles/vh001").set({
      name: "Vehicle 01",
      status: "OFF",
      lastUser: "",
      lastScan: "",
    });

    res.send("Vehicle Added ✅");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* =========================
   RFID SCAN API
========================= */
app.get("/scan", async (req, res) => {
  try {
    const scannedUID = "A1B2C3D4"; // change later from ESP32 request

    const usersSnapshot = await db.ref("/users").once("value");
    const users = usersSnapshot.val();

    let foundUser = null;

    for (let key in users) {
      if (users[key].rfid_uid === scannedUID) {
        foundUser = users[key];
        break;
      }
    }

    if (foundUser) {
      await db.ref("/vehicles/vh001").update({
        status: "ON",
        lastUser: foundUser.name,
        lastScan: new Date().toLocaleString(),
      });

      await db.ref("/logs/log001").set({
        uid: scannedUID,
        user: foundUser.name,
        result: "AUTHORIZED",
        time: new Date().toLocaleString(),
      });

      res.send("Access Granted ✅ Vehicle ON");
    } else {
      await db.ref("/alerts/alert001").set({
        message: "Unauthorized RFID Attempt",
        time: new Date().toLocaleString(),
      });

      res.send("Access Denied ❌");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* =========================
   VEHICLE OFF
========================= */
app.get("/vehicle-off", async (req, res) => {
  try {
    await db.ref("/vehicles/vh001").update({
      status: "OFF",
    });

    res.send("Vehicle Turned OFF ✅");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* =========================
   VEHICLE STATUS
========================= */
app.get("/status", async (req, res) => {
  try {
    const snapshot = await db.ref("/vehicles/vh001").once("value");
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/* =========================
   VIEW LOGS
========================= */
app.get("/view-logs", async (req, res) => {
  try {
    const snapshot = await db.ref("/logs").once("value");
    res.json(snapshot.val());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/seed-log", async (req, res) => {
  await db.ref("/logs/log001").set({
    uid: "A1B2C3D4",
    user: "Judah",
    result: "AUTHORIZED",
    time: "4/19/2026, 10:25 PM"
  });

  res.send("Sample log added");
});

app.get("/vehicle-status", async (req, res) => {
  try {
    const snap = await db.ref("vehicle/status").once("value");
    res.json({ status: snap.val() || "OFF" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch status" });
  }
});

app.post("/start-vehicle", async (req, res) => {
  try {
    await db.ref("vehicle/status").set("ON");
    res.json({ message: "Vehicle Started" });
  } catch (error) {
    res.status(500).json({ error: "Failed to start vehicle" });
  }
});

app.post("/stop-vehicle", async (req, res) => {
  try {
    await db.ref("vehicle/status").set("OFF");
    res.json({ message: "Vehicle Stopped" });
  } catch (error) {
    res.status(500).json({ error: "Failed to stop vehicle" });
  }
});
/* =========================
   SERVER START
========================= */
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});