const communityEvents = artifacts.require("CommunityEvents");
module.exports = function (deployer) {
    deployer.deploy(communityEvents);
};