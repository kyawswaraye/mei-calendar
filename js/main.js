// Select Date with color
jsCalendar.prototype.colorfulSelect = function (dates, color) {
	// If no arguments
	if (typeof dates === 'undefined') {
		// Return
		return this;
	}

	// If dates not array
	if (!(dates instanceof Array)) {
		// Lets make it an array
		dates = [dates];
	}

	// Save colors
	this._colorful_saveDates(dates, color);
	// Select dates
	this._selectDates(dates);

	if (!this._colorful_patched) {
		this._colorful_patched = this.refresh;
		this.refresh = function (date) {
			// Call original refresh
			this._colorful_patched(date);
			// Refresh select Colors
			this._colorful_update();
			// Return
			return this;
		};
	}
	// Refresh
	this.refresh();

	// Return
	return this;
};

// Save dates colors
jsCalendar.prototype._colorful_saveDates = function (dates, color) {
	// Copy array instance
	dates = dates.slice();

	// Parse dates
	for (let i = 0; i < dates.length; i++) {
		dates[i] = jsCalendar.tools.parseDate(dates[i]);
		dates[i].setHours(0, 0, 0, 0);
		dates[i] = dates[i].getTime();
	}

	if (typeof this._colorful_colors == "undefined") {
		this._colorful_colors = {};
	}

	// Save each date color
	for (i = dates.length - 1; i >= 0; i--) {
		this._colorful_colors[dates[i]] = color;
	}
};

// Refresh colors
jsCalendar.prototype._colorful_update = function () {
	// Get month info
	let month = this._getVisibleMonth(this._date);

	// Check days
	let timestamp;
	for (let i = month.days.length - 1; i >= 0; i--) {
		// If date is selected
		timestamp = month.days[i].getTime();
		if (this._selected.indexOf(timestamp) >= 0 && this._colorful_colors.hasOwnProperty(timestamp)) {
			this._elements.bodyCols[i].className = 'jsCalendar-selected' + ' ' + this._colorful_colors[timestamp];
		}
	}
};

// Get the auto-calendar (we have to wait the window load event)
let calendar = jsCalendar.new("#mycalendar", "now", {
	"zeroFill": "true",
	"dayFormat": "DDD"
});

const holidays = [
	{
		date: '1/1/2022',
		description: 'နှစ်ဆန်းတစ်ရက်နေ့'
	},
	{
		date: '2/1/2022',
		description: 'ကရင်နှစ်သစ်ကူးနေ့'
	},
	{
		date: '4/1/2022',
		description: 'လွပ်လပ်ရေးနေ့'
	},
	{
		date: '12/2/2022',
		description: 'ပြည်ထောင်စုနေ့'
	},
	{
		date: '1/3/2022',
		description: 'မိန်မိန်းမွေးနေ့'
	},
	{
		date: '2/3/2022',
		description: 'တောင်သူလယ်သမားနေ့'
	},
	{
		date: '16/3/2022',
		description: 'တပေါင်းပွဲတော်နေ့'
	},
	{
		date: '27/3/2022',
		description: 'စခ တွေမြူးတဲ့နေ့'
	},
	{
		date: '9/4/2022',
		description: 'သင်္ကြန်ရုံးပိတ်ရက်'
	},
	{
		date: '10/4/2022',
		description: 'သင်္ကြန်ရုံးပိတ်ရက်'
	},
	{
		date: '11/4/2022',
		description: 'သင်္ကြန်ရုံးပိတ်ရက်'
	},
	{
		date: '12/4/2022',
		description: 'သင်္ကြန်ရုံးပိတ်ရက်'
	},
	{
		date: '13/4/2022',
		description: 'သင်္ကြန်အကြိုနေ့'
	},
	{
		date: '14/4/2022',
		description: 'သင်္ကြန်အကျနေ့'
	},
	{
		date: '15/4/2022',
		description: 'သင်္ကြန်အကြတ်နေ့'
	},
	{
		date: '16/4/2022',
		description: 'သင်္ကြန်အတက်နေ့'
	},
	{
		date: '17/4/2022',
		description: 'နှစ်ဆန်းတစ်ရက်နေ့'
	},
	{
		date: '1/5/2022',
		description: 'အလုပ်သမားနေ့'
	},
	{
		date: '14/5/2022',
		description: 'ညောင်ရေသွန်းပွဲတော်'
	},
	{
		date: '12/7/2022',
		description: 'ဓ္ဓမစကြာနေ့'
	},
	{
		date: '19/7/2022',
		description: 'အာဇာနည်နေ့'
	},
	{
		date: '8/10/2022',
		description: 'သီတင်းကျွတ်ရုံးပိတ်ရက်'
	},
	{
		date: '9/10/2022',
		description: 'သီတင်းကျွတ်လပြည့်နေ့'
	},
	{
		date: '10/10/2022',
		description: 'သီတင်းကျွတ်ရုံးပိတ်ရက်'
	},
	{
		date: '6/11/2022',
		description: 'တန်ဆောင်တိုင်ရုံးပိတ်ရက်'
	},
	{
		date: '7/11/2022',
		description: 'တန်ဆောင်မုန်းလပြည့်(လည်မယ်မိန်း)'
	},
	{
		date: '17/11/2022',
		description: 'အမျိုးသားနေ့'
	},
	{
		date: '27/11/2022',
		description: 'မိန်းကို့ကိုအဖြေပေးတဲ့နေ့'
	},
	{
		date: '22/12/2022',
		description: 'ကရင်နှစ်သစ်ကူးနေ့'
	},
]

const dateArray = holidays.map(e => e.date);

calendar.colorfulSelect(dateArray, 'holiday');

calendar.onDateClick(function (e, date) {
	const day = (new Date(date)).getDate();
	const month = (new Date(date)).getMonth() + 1;
	const year = (new Date(date)).getFullYear();
	combineDayMonth = `${day}/${month}/${year}`;
	const filterDate = holidays.find((e) => e.date == combineDayMonth);
	if (!filterDate) return;

	const showHideModal = document.querySelector('.modal');
	showHideModal.style.display == "block" ? showHideModal.style.display = "none"
		: showHideModal.style.display = "block";
	document.querySelector('.modalText').innerHTML = filterDate.description;
});
document.querySelector('.close').addEventListener('click', () => {
	document.querySelector('.modal').style.display = 'none';
})

// // Make changes on the month element
// calendar.onMonthRender(function (index, element, info) {
// 	// Show month index
// 	let month = index + 1;
// 	element.textContent += ' (' + (month > 9 ? '' : '0') + month + '/' + (info.start.getYear() + 1900) + ')';
// });

// Make changes on the date elements
calendar.onDateRender(function (date, element, info) {
	// Make weekends bold and red
	if (!info.isCurrent && (date.getDay() == 0)) {
		element.style.fontWeight = (info.isCurrentMonth) ? 'bold' : '';
		element.style.color = (info.isCurrentMonth) ? '#c32525' : '#ffb4b4';
		element.style.backgroundColor = (info.isCurrentMonth) ? '#ffdbdb' : '';
	}
});

const images = [
	"img/mei.jpg",
	"img/mei1.jpg",
	"img/mei2.jpg",
	"img/mei3.jpg",
	"img/mei4.jpg",
	"img/mei5.jpg",
	"img/mei6.jpg",
	"img/mei7.jpg",
	"img/mei8.jpg",
	"img/mei9.jpg",
	"img/mei10.jpg",
	"img/mei11.jpg",
]

const date = new Date();
const eachMonth = date.getMonth();

const imgWrapper = document.querySelector('#imgWrapper');
const imgDiv = document.createElement('img');

imgWrapper.appendChild(imgDiv);
imgDiv.src = images[eachMonth];
const changeImgLeft = document.querySelector('.jsCalendar-title-left');
changeImgLeft.addEventListener('click', () => {
	date.setMonth(date.getMonth() - 1);
	imgDiv.src = images[date.getMonth()];
})
const changeImgRight = document.querySelector('.jsCalendar-title-right');
changeImgRight.addEventListener('click', () => {
	date.setMonth(date.getMonth() + 1);
	imgDiv.src = images[date.getMonth()];
})

// Refresh layout
calendar.refresh();
