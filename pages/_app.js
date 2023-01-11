import { Provider } from "react-redux";
import { wrapper } from "../Store/Store";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { PersistGate } from "redux-persist/lib/integration/react"; 
import { persistStore } from "redux-persist";


export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

let persistor = persistStore(store)

  return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
        </PersistGate>
    </Provider>
  );
}


// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     const response = await fetch(`https://reqres.in/api/users/${Math.floor(Math.random() * (10) + 1)}`);
//     let data = await response.json();
//     console.log("data" )
//     store.dispatch(
//       AddTodo({
//         TodoName: `${data.first_name} ${data.last_name}`
//     })
//   );
// });

