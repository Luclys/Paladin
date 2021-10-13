const permFlags = Object.freeze({
    ADMINISTRATOR: "ADMINISTRATOR",//implicitly has all permissions, and bypasses all channel overwrites
    CREATE_INSTANT_INVITE: "CREATE_INSTANT_INVITE",//create invitations to the guild
    KICK_MEMBERS: "KICK_MEMBERS",
    BAN_MEMBERS: "BAN_MEMBERS",
    MANAGE_CHANNELS: "MANAGE_CHANNELS",//edit and reorder channels
    MANAGE_GUILD: "MANAGE_GUILD",//edit the guild information, region, etc.
    ADD_REACTIONS: "ADD_REACTIONS",//add new reactions to messages
    VIEW_AUDIT_LOG: "VIEW_AUDIT_LOG",
    PRIORITY_SPEAKER: "PRIORITY_SPEAKER",
    STREAM: "STREAM",
    VIEW_CHANNEL: "VIEW_CHANNEL",
    SEND_MESSAGES: "SEND_MESSAGES",
    SEND_TTS_MESSAGES: "SEND_TTS_MESSAGES",
    MANAGE_MESSAGES: "MANAGE_MESSAGES",//delete messages and reactions
    EMBED_LINKS: "EMBED_LINKS",//links posted will have a preview embedded
    ATTACH_FILES: "ATTACH_FILES",
    READ_MESSAGE_HISTORY: "READ_MESSAGE_HISTORY",//view messages that were posted prior to opening Discord
    MENTION_EVERYONE: "MENTION_EVERYONE",
    USE_EXTERNAL_EMOJIS: "USE_EXTERNAL_EMOJIS",//use emojis from different guilds
    VIEW_GUILD_INSIGHTS: "VIEW_GUILD_INSIGHTS",
    CONNECT: "CONNECT",//connect to a voice channel
    SPEAK: "SPEAK",//speak in a voice channel
    MUTE_MEMBERS: "MUTE_MEMBERS",//mute members across all voice channels
    DEAFEN_MEMBERS: "DEAFEN_MEMBERS",//deafen members across all voice channels
    MOVE_MEMBERS: "MOVE_MEMBERS",//move members between voice channels
    USE_VAD: "USE_VAD",//use voice activity detection
    CHANGE_NICKNAME: "CHANGE_NICKNAME",
    MANAGE_NICKNAMES: "MANAGE_NICKNAMES",//change other members' nicknames
    MANAGE_ROLES: "MANAGE_ROLES",
    MANAGE_WEBHOOKS: "MANAGE_WEBHOOKS",
    MANAGE_EMOJIS: "MANAGE_EMOJIS",
})
