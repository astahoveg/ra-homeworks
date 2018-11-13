'use strict';

function MessageHistory(props) {
    if (messageList.length == 0) {
        return null;
    }

    const MessagesChat = props.list.map((item) => {
        let MessageChat;

        if (item.type == 'response') {
            MessageChat = Response;
        } else if (item.type == 'message') {
            MessageChat = Message;
        } else {
            MessageChat = Typing;
        }

        return <MessageChat key={item.id} from={item.from} message={item} />;
    });

    return (
        <ul>
            {MessagesChat}
        </ul>
    );
}