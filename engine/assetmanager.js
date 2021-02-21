class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = [];
        this.downloadQueue = [];
    };

    queueDownload(path) {
        console.log("Queueing " + path);
        this.downloadQueue.push(path);
    };

    isDone() {
        return this.downloadQueue.length === this.successCount + this.errorCount;
    };

    downloadAll(callback) {
        if (this.downloadQueue.length === 0) setTimeout(callback, 10);
        for (var i = 0; i < this.downloadQueue.length; i++) {
			
			if (this.downloadQueue[i].substring(this.downloadQueue[i].length - 3) == 'mp3') { // mp3 file
				var aud = new Audio(this.downloadQueue[i]);
				var that = this;
				var path = this.downloadQueue[i];
				console.log(path);
				
				aud.addEventListener("loadeddata", function () {
					console.log("Loaded" + this.src);
					that.successCount++;
					if (that.isDone()) callback();
				});

				aud.addEventListener("error", function () {
					console.log("Error loading " + this.src);
					that.errorCount++;
					if (that.isDone()) callback();
				});

				aud.addEventListener("ended", function () {
					aud.pause();
					aud.currentTime = 0;
				});

				aud.src = path;
				aud.load();

				this.cache[path] = aud;
				
			} else { // image file
				var img = new Image();
				var that = this;

				var path = this.downloadQueue[i];
				console.log(path);

				img.addEventListener("load", function () {
					console.log("Loaded " + this.src);
					that.successCount++;
					if (that.isDone()) callback();
				});

				img.addEventListener("error", function () {
					console.log("Error loading " + this.src);
					that.errorCount++;
					if (that.isDone()) callback();
				});

				img.src = path;
				this.cache[path] = img;
			}
			
        }
    };

    getAsset(path) {
        return this.cache[path];
    };
};

