import React from 'react';
import './CharShortItem.css';
const CharShortItem = props => {

    
  

    let specIcon;
    if (props.spec === "Balance") {
      specIcon = "spell_nature_starfall";
    }
    if (props.spec === "Feral") {
      specIcon = "ability_druid_catform";
    }
    if (props.spec === "Bear") {
      specIcon = "ability_racial_bearform";
    }
    if (props.charClass === "Druid" && props.spec === "Resto") {
      specIcon = "spell_nature_healingtouch";
    }
    if (props.spec === "BM") {
      specIcon = "ability_hunter_bestialdiscipline";
    }
    if (props.spec === "Marksman") {
      specIcon = "ability_hunter_focusedaim";
    }
    if (props.spec === "Survival") {
      specIcon = "ability_hunter_camouflage";
    }
    if (props.spec === "Arcane") {
      specIcon = "spell_holy_magicalsentry";
    }
    if (props.spec === "Fire") {
      specIcon = "spell_fire_firebolt02";
    }
    if (props.spec === "Frost") {
      specIcon = "spell_frost_frostbolt02";
    }
    if (props.charClass === "Paladin" && props.spec === "Holy") {
      specIcon = "spell_holy_holybolt";
    }
    if (props.charClass === "Paladin" && props.spec === "Prot") {
      specIcon = "ability_paladin_shieldofthetemplar";
    }
    if (props.spec === "Retri") {
      specIcon = "spell_holy_auraoflight";
    }
    if (props.spec === "Disci") {
      specIcon = "spell_holy_powerwordshield";
    }
    if (props.charClass === "Priest" && props.spec === "Holy") {
      specIcon = "spell_holy_guardianspirit";
    }
    if (props.spec === "Shadow") {
      specIcon = "spell_shadow_shadowwordpain";
    }
    if (props.spec === "Assassin") {
      specIcon = "ability_rogue_eviscerate";
    }
    if (props.charClass === "Shaman" && props.spec === "Resto") {
      specIcon = "spell_nature_magicimmunity";
    }
    if (props.spec === "Enhancer") {
      specIcon = "spell_shaman_improvedstormstrike";
    }
    if (props.spec === "Ele") {
      specIcon = "spell_nature_lightning";
    }
    if (props.spec === "Balance") {
      specIcon = "spell_nature_starfall";
    }
    if (props.spec === "Affli") {
      specIcon = "spell_shadow_deathcoil";
    }
    if (props.spec === "Demo") {
      specIcon = "spell_shadow_metamorphosis";
    }
    if (props.spec === "Destro") {
      specIcon = "spell_shadow_rainoffire";
    }
    if (props.spec === "Arms") {
      specIcon = "ability_warrior_savageblow";
    }
    if (props.spec === "Fury") {
      specIcon = "ability_warrior_innerrage";
    }
    if (props.charClass === "Warrior" && props.spec === "Prot") {
      specIcon = "ability_warrior_defensivestance";
    }

let lowClass;
lowClass = props.charClass.toLowerCase();   
 return(
        <React.Fragment>
        <div id={props.id} className="char-short-item">
            <div className="char-short-item__img"><img className="class-icon" alt="class" src={`https://render-classic-us.worldofwarcraft.com/icons/56/classicon_${lowClass}.jpg`} /></div>
            <div className="char-short-item__char-info">
            <h2>{props.charName}</h2>
            <p>{props.charClass} | {props.spec}</p>
            </div>
            <div className="char-short-item__img">
            <img className="spec-icon spec-short-icon" alt="spec" src={`https://render-classic-us.worldofwarcraft.com/icons/56/${specIcon}.jpg`} />
            </div>
        </div>
        </React.Fragment>
    )
}

export default CharShortItem;
