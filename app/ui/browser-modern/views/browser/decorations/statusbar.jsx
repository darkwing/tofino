/*
Copyright 2016 Mozilla

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
*/

import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import Style from '../../../../shared/style';

import * as UIConstants from '../../../constants/ui';
import * as UISelectors from '../../../selectors/ui';
import * as PagesSelectors from '../../../selectors/pages';

const STATUS_STYLE = Style.registerStyle({
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  position: 'fixed',
  bottom: 0,
  left: 0,
  maxWidth: '75%',
  zIndex: UIConstants.STATUS_BAR_ZINDEX,
  padding: '2px 8px',
  border: '1px solid var(--theme-statusbar-border-color)',
  borderTopRightRadius: 'var(--theme-default-roundness)',
  borderLeftWidth: 0,
  borderBottomWidth: 0,
  background: 'var(--theme-statusbar-background)',
  color: 'var(--theme-content-color)',
});

class StatusBar extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div className={`browser-statusbar ${STATUS_STYLE}`}
        style={{ bottom: this.props.searchVisible ? UIConstants.SEARCH_BAR_HEIGHT : 0 }}
        hidden={!this.props.statusText}>
        {this.props.statusText}
      </div>
    );
  }
}

StatusBar.displayName = 'StatusBar';

StatusBar.propTypes = {
  statusText: PropTypes.string,
  searchVisible: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const selectedPageId = PagesSelectors.getSelectedPageId(state);
  const searchVisible = !!(selectedPageId &&
    PagesSelectors.getPageSearchVisible(state, selectedPageId));

  return {
    searchVisible,
    statusText: UISelectors.getStatusText(state),
  };
}

export default connect(mapStateToProps)(StatusBar);
