import { append } from './append';

function yyyymmddTime(): string {
    const now = new Date()
    const yyyy = now.getFullYear()
    const mm = now.getMonth() + 1
    const dd = now.getDate()

    return [
        yyyy,
        ('0' + mm).slice(-2),
        ('0' + dd).slice(-2),
    ].join('')
}

function hhmmsszzzTime(): string {
    const now = new Date()
    const hh = now.getHours()
    const mm = now.getMinutes()
    const ss = now.getSeconds()
    const zzz = now.getMilliseconds()

    return [
        ('0' + hh).slice(-2),
        ':',
        ('0' + mm).slice(-2),
        ':',
        ('0' + ss).slice(-2),
        ' ',
        ('00' + zzz).slice(-3),
    ].join('');
}

export function log(value: any) {
    append(`log/${yyyymmddTime()}.txt`, `${hhmmsszzzTime()} ${value}`)
}