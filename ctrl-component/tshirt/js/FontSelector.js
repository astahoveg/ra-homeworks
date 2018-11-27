const FontSelector = ({ fonts, selectedFont, onSelect }) => {
    const defStr = "abc";
    return (
        <div className="grid center font-item">
            {fonts.map(font => {
                return (
                    <React.Fragment>
                        <input type="radio" 
                               name="font" 
                               value={font.name} 
                               id={font.name} 
                               selected={((selectedFont)&&(font.path == selectedFont.name))} 
                               onChange={() => onSelect(font)} />
                        <label for={font.name} className="grid-1">
                            <PictureFont text={defStr} path={font.path} />
                        </label>
                    </React.Fragment>
                );
            })}
        </div>
    );
};