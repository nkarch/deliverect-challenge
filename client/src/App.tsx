import Layout from "./Layout";

import "./App.scss";
import { FormProvider } from "./formContext";
import Form from "./Form";

function App() {
    return (
        <>
            <FormProvider>
                <Layout>
                    <Form />
                </Layout>
            </FormProvider>
        </>
    );
}

export default App;
