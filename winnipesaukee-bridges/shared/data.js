const BRIDGES = [
  {
    "id": 1,
    "name": "1. Half Mile Islands Bridge (START)",
    "lat": 43.701741,
    "lng": -71.45479,
    "clearanceFt": 5,
    "clearance": "5ft",
    "zone": "Center Harbor",
    "type": "Half Mile Islands",
    "base": 5,
    "vessels": {
      "car": false,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 2,
    "name": "2. Birch \u2194 Steamboat Hornbeam 1933",
    "lat": 43.63454,
    "lng": -71.3745,
    "clearanceFt": 4,
    "clearance": "4ft foot 1933",
    "zone": "Center Harbor",
    "type": "Birch and Steamboat",
    "base": 4,
    "vessels": {
      "car": false,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 3,
    "name": "3. Suissevale Bridge",
    "lat": 43.72306,
    "lng": -71.36889,
    "clearanceFt": 6,
    "clearance": "6ft",
    "zone": "Suissevale",
    "type": "Suissevale community",
    "base": 6,
    "vessels": {
      "car": true,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 4,
    "name": "4. Long Island Bridge",
    "lat": 43.667263,
    "lng": -71.348508,
    "clearanceFt": 12,
    "clearance": "12ft",
    "zone": "Moultonborough",
    "type": "Long Island Bridge",
    "base": 12,
    "vessels": {
      "car": true,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 5,
    "name": "5. Black Cat Island Bridge",
    "lat": 43.683968,
    "lng": -71.421184,
    "clearanceFt": 7,
    "clearance": "7ft",
    "zone": "Moultonborough",
    "type": "Black Cat",
    "base": 7,
    "vessels": {
      "car": true,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 6,
    "name": "6. Beaver Island Channel",
    "lat": 43.67367,
    "lng": -71.43716,
    "clearanceFt": 3,
    "clearance": "3ft",
    "zone": "Center Harbor",
    "type": "Beaver Island Channel",
    "base": 3,
    "vessels": {
      "car": false,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": false
    }
  },
  {
    "id": 7,
    "name": "7. Whaleback / October Morn \u2194 October Eve",
    "lat": 43.72255,
    "lng": -71.3856,
    "clearanceFt": 3,
    "clearance": "3ft foot",
    "zone": "Broads",
    "type": "Whaleback Island (October Morn) connected to October Eve",
    "base": 3,
    "vessels": {
      "car": false,
      "pwc": false,
      "smallboat": false,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 8,
    "name": "8. Three Mile - Hawk's Nest",
    "lat": 43.67234,
    "lng": -71.42253,
    "clearanceFt": 2,
    "clearance": "2ft foot",
    "zone": "Moultonborough",
    "type": "Three Mile Island Camp",
    "base": 2,
    "vessels": {
      "car": false,
      "pwc": false,
      "smallboat": false,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 9,
    "name": "9. Little Bear Hole in the Wall",
    "lat": 43.636744,
    "lng": -71.319237,
    "clearanceFt": 4,
    "clearance": "4ft",
    "zone": "Tuftonboro",
    "type": "Hole in the Wall between Little Bear and Devens",
    "base": 4,
    "vessels": {
      "car": false,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": false
    }
  },
  {
    "id": 10,
    "name": "10. Penny Island Bridge",
    "lat": 43.633,
    "lng": -71.40725,
    "clearanceFt": 5,
    "clearance": "5ft",
    "zone": "Meredith",
    "type": "Penny Island",
    "base": 5,
    "vessels": {
      "car": false,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 11,
    "name": "11. Oak Island Bridge",
    "lat": 43.632,
    "lng": -71.4515,
    "clearanceFt": 6,
    "clearance": "6ft",
    "zone": "Meredith",
    "type": "Oak Island",
    "base": 6,
    "vessels": {
      "car": true,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 12,
    "name": "12. Governors Island Bridge",
    "lat": 43.602066,
    "lng": -71.430694,
    "clearanceFt": 10,
    "clearance": "10ft",
    "zone": "Gilford",
    "type": "Governors Island Bridge",
    "base": 10,
    "vessels": {
      "car": true,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 13,
    "name": "13. Weirs Channel Stone Bridge",
    "lat": 43.603611,
    "lng": -71.455,
    "clearanceFt": 8,
    "clearance": "8ft",
    "zone": "Weirs",
    "type": "Weirs Channel Stone Bridge",
    "base": 8,
    "vessels": {
      "car": true,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 14,
    "name": "14. Christmas Island Bridge",
    "lat": 43.5785,
    "lng": -71.456,
    "clearanceFt": 6,
    "clearance": "6ft",
    "zone": "Paugus Bay",
    "type": "Christmas Island Bridge",
    "base": 6,
    "vessels": {
      "car": false,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 15,
    "name": "15. Silver Sands Marina Walk Bridge",
    "lat": 43.581386,
    "lng": -71.406525,
    "clearanceFt": 4,
    "clearance": "4ft",
    "zone": "Gilford",
    "type": "Silver Sands Marina Walk",
    "base": 4,
    "vessels": {
      "car": false,
      "pwc": false,
      "smallboat": false,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 16,
    "name": "16. Belknap Point Tiny Island",
    "lat": 43.5811,
    "lng": -71.4055,
    "clearanceFt": 3,
    "clearance": "3ft",
    "zone": "Gilford",
    "type": "Belknap Point Tiny Island",
    "base": 3,
    "vessels": {
      "car": false,
      "pwc": false,
      "smallboat": false,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 17,
    "name": "17. Stonedam Island Causeway",
    "lat": 43.5845,
    "lng": -71.474,
    "clearanceFt": 4,
    "clearance": "4ft",
    "zone": "Meredith",
    "type": "Stonedam Island Causeway",
    "base": 4,
    "vessels": {
      "car": false,
      "pwc": false,
      "smallboat": false,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 18,
    "name": "18. Worcester Island Bridge",
    "lat": 43.5632,
    "lng": -71.2018,
    "clearanceFt": 5,
    "clearance": "5ft",
    "zone": "Alton",
    "type": "Worcester Island near Springfield Point",
    "base": 5,
    "vessels": {
      "car": false,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 19,
    "name": "19. Wolfeboro Back Bay Bridge",
    "lat": 43.476389,
    "lng": -71.24,
    "clearanceFt": 9,
    "clearance": "9ft",
    "zone": "Wolfeboro",
    "type": "Wolfeboro Back Bay Bridge",
    "base": 9,
    "vessels": {
      "car": true,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  },
  {
    "id": 20,
    "name": "20. Alton Bay Bridge NH-11 1942",
    "lat": 43.4725,
    "lng": -71.236,
    "clearanceFt": 10,
    "clearance": "10ft",
    "zone": "Alton Bay",
    "type": "Alton Bay Bridge NH-11 1942",
    "base": 10,
    "vessels": {
      "car": true,
      "pwc": true,
      "smallboat": true,
      "kayak": true,
      "pedestrian": true
    }
  }
];
