const UserFollowing = require("../Models/UserFollowing");


class UserFollowings {
    constructor() {
        this.userFollowing = new UserFollowing();
    }
    
    async followUser(req, res) {

        const userId = req.session.userDetails?.userId;
        const { followingId } = req.body;

        if (!userId) {
            res.json({
                success: false,
                errorMessage: "Not authorized"
            });
            return;
        }


        const result = await this.userFollowing.followUser(userId, followingId);
        res.json({
            success: true,
            errorMessage: []
        });
    }
    
    async unFollowUser(req, res) {
        const userId = req.session.userDetails?.userId;
        const { followingId } = req.body;

        if (!userId) {
            res.json({
                success: false,
                errorMessage: "Not authorized"
            });
            return;
        }
        const result = await this.userFollowing.unfollowUser(userId, followingId);
        res.json({
            success: true,
            errorMessage: []
        });
    }
}

module.exports = UserFollowings;
