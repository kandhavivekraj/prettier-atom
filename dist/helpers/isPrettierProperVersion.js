'use strict';

const _ = require('lodash/fp');
const { addErrorNotification } = require('../atomInterface');
const getPrettierInstance = require('./getPrettierInstance');

const displayImproperPrettierVersionError = () => addErrorNotification('Prettier version must be >= 1.13.4');

// NOTE: We are using the presence of getFileInfo.sync to determine whether prettier is new enough.
//       This may change over time so feel free to update this to use something else when necessary.
const isGetFileInfoDefined = prettier => !!_.get('getFileInfo.sync', prettier);

const isPrettierProperVersion = _.flow(getPrettierInstance, prettier => isGetFileInfoDefined(prettier) || displayImproperPrettierVersionError() || false);

module.exports = isPrettierProperVersion;