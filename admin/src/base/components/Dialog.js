import React, { Component, PropTypes } from 'react'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'

export default class Dialog extends Component {
  getClassName() {
    return classNames({
      'modal': true,
      'fade': true,
      'in': this.props.show
    })
  }
  closeModal(e) {
    if (e.target.getAttribute('id') == 'modal-dialog') {
      this.props.onClose()
    }
  }
  render() {
    return (
      <div className={this.getClassName()} id="modal-dialog" onClick={this.closeModal.bind(this)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" onClick={this.props.onClose}><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">
                {this.props.title}
              </h4>
            </div>
            <div className="modal-body">
              {this.props.notice}
            </div>
            <div className="modal-footer">
              <button type="button" onClick={this.props.onClose} className="btn btn-default" data-dismiss="modal">
                {this.props.no}
              </button>
              <button type="button" onClick={this.props.onSuccess} className="btn btn-primary">
                {this.props.yes}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dialog.defaultProps = {
  show: false,
  title: <FormattedMessage id="dialog.confirmation" defaultMessage="Confirmação" />,
  notice: <FormattedMessage id="dialog.are_you_sure" defaultMessage="Tem certeza que deseja deletar?" />,
  yes: <FormattedMessage id="dialog.yes" defaultMessage="Sim" />,
  no: <FormattedMessage id="dialog.no" defaultMessage="Não" />,
}

Dialog.propTypes = {
  show: PropTypes.bool
}
