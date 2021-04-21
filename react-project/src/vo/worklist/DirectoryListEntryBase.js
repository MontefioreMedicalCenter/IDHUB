import VoBase from '../VoBase'

export default class DirectoryListEntryBase extends VoBase {
	constructor(
		_baseName,
		_canExecute,
		_canRead,
		_canWrite,
		_fileContents,
		_fileModificationDate,
		_fileName,
		_filePermissions,
		_fileSize,
		_fileURL,
		_isDirectory,
		_parentDir,
		_parentURL
	) {
		super()
		this._baseName = _baseName
		this._canExecute = _canExecute
		this._canRead = _canRead
		this._canWrite = _canWrite
		this._fileContents = _fileContents
		this._fileModificationDate = _fileModificationDate
		this._fileName = _fileName
		this._filePermissions = _filePermissions
		this._fileSize = _fileSize
		this._fileURL = _fileURL
		this._isDirectory = _isDirectory
		this._parentDir = _parentDir
		this._parentURL = _parentURL
	}
	set baseName(value) {
		this._baseName = value
	}
	get baseName() {
		return this._baseName
	}
	set canExecute(value) {
		this._canExecute = value
	}
	set canRead(value) {
		this._canRead = value
	}
	set canWrite(value) {
		this._canWrite = value
	}
	/*[Bindable(event="unused")]
    public function get dateFormat():SimpleDateFormat {
        return _dateFormat;
    }*/
	set fileContents(value) {
		this._fileContents = value
	}
	get fileContents() {
		return this._fileContents
	}
	set fileModificationDate(value) {
		this._fileModificationDate = value
	}
	get fileModificationDate() {
		return this._fileModificationDate
	}
	set fileName(value) {
		this._fileName = value
	}
	get fileName() {
		return this._fileName
	}
	set filePermissions(value) {
		this._filePermissions = value
	}
	get filePermissions() {
		return this._filePermissions
	}
	set fileSize(value) {
		this._fileSize = value
	}
	get fileSize() {
		return this._fileSize
	}
	set fileURL(value) {
		this._fileURL = value
	}
	get fileURL() {
		return this._fileURL
	}
	set isDirectory(value) {
		this._isDirectory = value
	}
	set parentDir(value) {
		this._parentDir = value
	}
	get parentDir() {
		return this._parentDir
	}
	set parentURL(value) {
		this._parentURL = value
	}
	get parentURL() {
		return this._parentURL
	}
}
