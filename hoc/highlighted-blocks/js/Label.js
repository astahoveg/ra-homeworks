'use strict';

function labelComponent(Component) {
    return function (props, ...args) {
        let Label;

        if (props.views < 100) {
            Label = New;
        } else if (props.views > 1000) {
            Label = Popular;
        } else {
            return Component.apply(this, [props, ...args]);
        }

        return (
            <Label>
                {Component.apply(this, [props, ...args])}
            </Label>
        );
    }
}

const LabelVideo = labelComponent(Video);
const LabelArticle = labelComponent(Article);