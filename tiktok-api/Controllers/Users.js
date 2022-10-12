const UserModel = require("../Models/User");
const VideoModel = require("../Models/Video");
const { uuid } = require("uuidv4");

class Users {
    constructor() {
        this.user = new UserModel();
        this.video = new VideoModel();
    }
    
    get(req, res) {
        console.log(req.sessionID);
        
        res.json({
            success: req.session.userDetails ? true : false,
            errorMessage: [],
            sessionId: req.sessionID,
            userDetails: req.session.userDetails
        });
    }

    async create(req, res) {
        const { name, username, emailAddress, password } = req.body;
        //move this validation to another function inside model
        if (!name) {
            validationErrors.push("Email address is required.");
        }
        if (!username) {
            validationErrors.push("Username is required");
        }
        if (!emailAddress) {
            validationErrors.push("Email is required.");
        }
        if (!password) {
            validationErrors.push("Password is required.");
        }
        //add validation if email and username already exists

        if (validationErrors.length > 0) {
            res.json({
                success: false,
                errorMessage: validationErrors
            });
            return;
        }
        const userDetails = {
            userId:  uuid(),
            name,
            username,
            emailAddress,
            password,
            imageUrl: "default-profile-pic.png",
            bio: ""
        }

        const result = await this.user.createUser(userDetails);

        const newUserDetails = {
            userId: userDetails.userId,
            name: userDetails.name,
            username: userDetails.username,
            imageUrl: userDetails.imageUrl,
            bio: userDetails.bio
        };

        req.session.userDetails = newUserDetails;
        res.json({
            success: true,
            errorMessage: [],
            newUserDetails
        });
    }

    async update(req, res) {
        const userId = req.session.userDetails?.userId;
        const username = req.session.userDetails?.username;
        const { imageUrl, name, bio } = req.body;
        const newImageUrl = req.file ? req.file.filename : imageUrl;
        let validationErrors = [];

        if (!userId) {
            res.json({
                success: false,
                errorMessage: ["Not authorized"],
            });
            return;
        }

        //move this validation to another function inside model
        if (!name) {
            validationErrors.push("Email address is required.");
        }
        if (bio.length > 80) {
            validationErrors.push("Bio should not exceed 80 characters.");
        }

        if (validationErrors.length > 0) {
            res.json({
                success: false,
                errorMessage: validationErrors
            });
            return;
        }

        const result = await this.user.updateUser(userId, { name, bio, imageUrl: newImageUrl });
        const userDetails = {
            userId,
            name,
            username,
            imageUrl: newImageUrl,
            bio
        }
        req.session.userDetails = userDetails;
        res.json({
            success: true,
            errorMessage: [],
            userDetails
        });
    }

    async getUserByUsername(req, res) {
        const userId = req.session.userDetails?.userId;
        const { username } = req.params;
        const user = await this.user.getUserByUsername(username, userId);

        if (!user) {
            res.json({
                success: false,
                errorMessage: ["User not found."]
            });
            return;
        }

        let videos;
        console.log(user.id, userId);
        if (user.id === userId) {
            videos = await this.video.getAllVideos(user.id);
        } 
        else {
            console.log("public videos");
            videos = await this.video.getPublicVideos(user.id);
        }

        res.json({
            success: true,
            errorMessage: [],
            userDetails: {
                userId: user.id,
                name: user.name,
                username: user.username,
                imageUrl: user.image_url,
                bio: user.bio,
                followingCount: user.followingCount,
                followersCount: user.followersCount,
                likes: 0,
                isFollowing: user.isFollowing
            },
            videos,
        });
    }

    async login(req, res) {
        const { emailAddress, password } = req.body;
        let validationErrors = [];
        //move this validation to another function inside model
        if (!emailAddress) {
            validationErrors.push("Email address is required.");
        }
        if (!password) {
            validationErrors.push("Password is required.");
        }

        if (validationErrors.length > 0) {
            res.json({
                success: false,
                errorMessage: validationErrors
            });
            return;
        }
        
        const user = await this.user.getUserByEmail(emailAddress);
        if (!user || !this.user.verifyPassword(password, user.password)) {
            validationErrors.push("Invalid username/password combination.");
            res.json({
                success: false,
                errorMessage: validationErrors
            });
            return;
        }
        const userDetails = {
            userId: user.id,
            name: user.name,
            username: user.username,
            imageUrl: user.image_url
        }

        req.session.userDetails = userDetails;

        res.json({
            success: true,
            errorMessage: validationErrors,
            sessionId: req.sessionID,
            userDetails
        });
    }

    async getUserSuggestions(req, res) {
        const userId = req.session.userDetails?.userId;
        const suggestedAccounts = await this.user.getSuggestedAccounts(userId);
        const followingAccounts = await this.user.getFollowingAccounts(userId);
        res.json({
            success: true,
            errorMessage: [],
            suggestedAccounts,
            followingAccounts,
        });
    }
}

module.exports = Users;