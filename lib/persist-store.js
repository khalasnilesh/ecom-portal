export default class StateLoader {

  loadState() {
      try {
          let serializedState = localStorage.getItem("e-com-demo-state");

          if (serializedState === null) {
              return this.initializeState();
          }

          return JSON.parse(serializedState);
      }
      catch (err) {
          return this.initializeState();
      }
  }

  saveState(state) {
      try {
          let serializedState = JSON.stringify(state);
          localStorage.setItem("e-com-demo-state", serializedState);

      }
      catch (err) {
      }
  }

  initializeState() {
      return {
            //state object
          }
      };
  }