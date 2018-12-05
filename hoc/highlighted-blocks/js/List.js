'use strict';

const List = props => {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <LabelVideo {...item} />
                );

            case 'article':
                return (
                    <LabelArticle {...item} />
                );
        }
    });
};
