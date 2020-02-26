/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Toggle from 'components/Toggle';
import SliderDiv from 'components/SliderDiv';
import Wrapper from './Wrapper';
import messages from './messages';
import { appLocales } from '../../i18n';
import {
  changeIsLanguageBarOpen,
  changeLocale,
} from '../LanguageProvider/actions';
import {
  makeSelectLanguageBar,
  makeSelectLocale,
} from '../LanguageProvider/selectors';

export function LocaleToggle(props) {
  return (
    <Wrapper>
      <SliderDiv
        value={props.locale}
        values={appLocales}
        messages={messages}
        onToggle={props.onLocaleToggle}
        isLanguageBarOpen={props.isLanguageBarOpen}
      />
      <Toggle
        changeIsLanguageBarOpen={props.changeIsLanguageBarOpen}
        isLanguageBarOpen={props.isLanguageBarOpen}
      />
    </Wrapper>
  );
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  changeIsLanguageBarOpen: PropTypes.func,
  locale: PropTypes.string,
  isLanguageBarOpen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  isLanguageBarOpen: makeSelectLanguageBar(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: evt =>
      dispatch(changeLocale(evt.currentTarget.textContent)),
    changeIsLanguageBarOpen: isLanguageBarOpen =>
      dispatch(changeIsLanguageBarOpen(!!isLanguageBarOpen)),
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleToggle);
