import {BrowserRouter , Routes , Route} from "react-router-dom";
import { Signup } from "../Signup/Signup";

const RootRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/customer-signup" element={<Signup/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default RootRouter;