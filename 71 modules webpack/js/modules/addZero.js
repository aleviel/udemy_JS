export default function addZero(num) {
	if (num < 10 && num >= 0) {
		return `0${num}`;
	} else {
		return num;
	}
}
