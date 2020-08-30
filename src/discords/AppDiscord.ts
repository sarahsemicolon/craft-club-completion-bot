import { Discord, On, Client, ArgsOf } from "@typeit/discord";
import { Collection, GuildMember } from "discord.js";
import { Main } from "../Main";

const completionRoleID: string = Main.config.COMPLETION_ROLE_ID;
const trigger: string = "!ididit";

@Discord()
export abstract class AppDiscord {
  @On("message")
  onMessage(
    [message]: ArgsOf<"message">,
    client: Client
  ) {       
    if (message.author.id !== client.user?.id 
        && message.content === trigger) {
      message.reply(`congratulations on your finished project! 🎉🎉🎉`);
      const members = message.guild?.members;

      members?.fetch()?.then(this.clearRoleFromAll);
      members?.fetch(message.author.id)?.then(this.assignRole);
    }
  }

  clearRoleFromAll(members: Collection<string, GuildMember>) {
    members.forEach(
      (member, _) => {
        member.roles.remove(completionRoleID);
      }
    );
  }

  assignRole(member: GuildMember) {
    member.roles.add(completionRoleID);
  }
}