const React = require('react'); // eslint-disable-line no-unused-vars

const ResultOptionInput = ({
  tagmatch,
  missmatch,
  isDisconnected,
  onChange,
}) => {
  return (
    <div>
      <label>
        <input
          name="missmatch" type="checkbox"
          checked={missmatch}
          disabled={isDisconnected}
          onChange={(ev) => { onChange('missmatch', ev.target.checked); }}
        />マッチング事故
      </label>

      <label>
        <input
          name="tagmatch" type="checkbox"
          checked={tagmatch}
          onChange={(ev) => { onChange('tagmatch', ev.target.checked); }}
        />タッグマッチ
      </label>
    </div>
  );
};

ResultOptionInput.propTypes = {
  tagmatch:       React.PropTypes.bool.isRequired,
  missmatch:      React.PropTypes.bool.isRequired,
  isDisconnected: React.PropTypes.bool.isRequired,
  onChange:       React.PropTypes.func.isRequired,
};

module.exports = ResultOptionInput;
