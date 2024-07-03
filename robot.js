const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (from in graph) {
      graph[from].push(to);
    } else {
      graph[from] = [to];
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      return turn;
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

function improvedRobot({ place, parcels }, route) {
  function findClosestParcel(place, parcels) {
    let minRoute = null;
    let closestParcel = null;

    for (let parcel of parcels) {
      let routeToParcel =
        parcel.place != place
          ? findRoute(roadGraph, place, parcel.place)
          : findRoute(roadGraph, place, parcel.address);

      if (!minRoute || routeToParcel.length < minRoute.length) {
        minRoute = routeToParcel;
        closestParcel = parcel;
      }
    }

    return { parcel: closestParcel, route: minRoute };
  }

  if (route.length == 0) {
    let { parcel, route: newRoute } = findClosestParcel(place, parcels);

    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }

  return { direction: route[0], memory: route.slice(1) };
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

function compareRobots(robot1, robot2, parcels, simulations) {
  const village = VillageState.random(parcels);
  let robot1Total = 0;
  let robot2Total = 0;
  for (let i = 0; i < simulations; i++) {
    const robot1Turns = runRobot(village, robot1, []);
    const robot2Turns = runRobot(village, robot2, []);
    robot1Total += robot1Turns;
    robot2Total += robot2Turns;
  }
  const robot1Average = robot1Total / simulations;
  const robot2Average = robot2Total / simulations;
  console.log(
    `Robot 1 took on average ${robot1Average} turns, while Robot 2 took ${robot2Average}`,
  );
}

compareRobots(goalOrientedRobot, improvedRobot, 100, 50);
