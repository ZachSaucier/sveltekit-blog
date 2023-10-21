<div class="ribbon ribbon__horiz" />
<div class="ribbon ribbon__vert" />

<style>
	.ribbon {
		position: absolute;
		z-index: -1;
	}
	.ribbon::before,
	.ribbon::after {
		content: '';
		position: absolute;
		transform-origin: bottom right;
	}
	.ribbon__horiz {
		background-color: var(--accent);
		left: 300px;
		top: 130px;
		width: calc(100% - 300px);
		height: 80px;
	}
	.ribbon__horiz::before {
		background-color: inherit;
		height: 100%;
		width: 420px;
		left: -420px;
		transform: rotate(30deg);
	}
	.ribbon__vert {
		background-color: var(--accent-dark);
		left: 30px;
		top: 171px;
		height: calc(100% - 172px);
		width: 80px;
	}
	.ribbon__vert::before {
		background-color: inherit;
		width: 95%;
		height: 500px;
		top: -438px;
		left: -33px;
		transform: rotate(55deg);
	}
	.ribbon__vert::after {
		background-color: var(--accent);
		width: 100%;
		height: 92px;
		top: -68px;
		left: 164px;
		transform: skewY(30deg);
	}
	@media only screen and (max-width: 991px) {
		.ribbon__horiz {
			left: 300px;
			top: 110px;
			height: 55px;
		}
		.ribbon__vert {
			width: 55px;
			top: 171px;
		}
		.ribbon__vert::before {
			top: -458px;
			left: -22px;
		}
		.ribbon__vert::after {
			height: 62px;
			top: -92px;
			left: 175px;
		}
	}
	@media only screen and (max-width: 767px) {
		.ribbon__horiz {
			top: 97px;
		}
		.ribbon__vert {
			top: 158px;
			height: calc(100% - 185px);
		}
	}
	@media only screen and (max-width: 680px) {
		.ribbon__horiz {
			height: 35px;
			left: 100px;
			top: 90px;
			width: calc(100% - 100px);
		}
		.ribbon__horiz::before {
			left: -420px;
		}
		.ribbon__vert {
			width: 35px;
			left: 5px;
			top: 100px;
			height: calc(100% - 100px);
		}
		.ribbon__vert::before {
			top: -474px;
			left: -14px;
		}
		.ribbon__vert::after {
			height: 40px;
			top: -19px;
			left: 54px;
		}
	}
</style>
