import { Strategy, ExtractJwt } from "passport-jwt";
import User from "./model";

function setJwtStrategy(passport) {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "68BCC73B8BC2157F8BD422FF5FF6319C1BB70EF6F10D3408C81EBA813E5F2B8D",
    };
    passport.use(
        new Strategy(options,
            async (payload, done) => {
                try {
                    const user = await User.findById(payload.id);
                    if (user) {
                        done(null, payload);
                    } else {
                        done(null, false)
                    }
                } catch (error){
                    console.error(error);
                    done(error, false);
                }
        })
    );
};


export default setJwtStrategy;