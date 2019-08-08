import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import EOGVisualization from "./components/EOGVisualization";
import { teal as primary, blueGrey } from "@material-ui/core/colors"

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary,
    background: {
      main: blueGrey[100]
    }
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <Wrapper>
        <Header />
        <EOGVisualization />
      </Wrapper>
    </Provider>
  </MuiThemeProvider>
);

export default App;
