import { Router } from "express"
import UserViewModel from "../viewmodels/UserViewModel"
import UserAuth from "./user"
import ExceptionModel from "../viewmodels/ExceptionModel";
import "regenerator-runtime/runtime"

const router = Router();

router.post('/signup', async (req, res) => {

    try{
        var data = req.body;

        if(data) {
            var userViewModel = UserViewModel.map(null, data["UserName"], data["Password"]);

            await UserAuth.UserAuthentication(userViewModel)
            .then(result => {
                res.json({result});
            }).catch(err => {
                res.json({err});
            });
        }
    }
    catch(error){
        //Log Exception
        res.json(ExceptionModel.printError(error.message));
    }
});

router.post("/signin", async (req, res) => {
    try {
        var data = req.body;
        if(data){
            var userViewModel = UserViewModel.map(null,data["UserName"], data["Password"]);

            await UserAuth.UserSignIn(userViewModel)
            .then(result => {
                res.json(result);
            }).catch(err => {
                res.json(err);
            })
        }
        
    } catch (error) {
        res.json(ExceptionModel.printError(error.message));
    }
})

export default router;