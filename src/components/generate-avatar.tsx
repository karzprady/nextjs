import {createAvatar} from "@dicebear/core"
import {botttsNeutral , initials} from "@dicebear/collection"
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

interface generatedProps{
    seed : string,
    className ? :string,
    variant : "botttsNeutral" | "initials";
}
export default function GeneratedAvatar({seed,className,variant} : generatedProps){
    let avatar;
    if(variant ==="botttsNeutral"){
        avatar = createAvatar(botttsNeutral,{
            seed
        })
    }
    else{
        avatar = createAvatar(initials,{
            seed,
            fontWeight : 500,
            fontSize : 42
        })
    }
    return <div>
        <Avatar className={cn(className)}>
            <AvatarImage src={avatar.toDataUri()} alt="avatar"/>
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        
    </div>
}