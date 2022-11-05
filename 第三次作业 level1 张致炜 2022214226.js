function mypush(arr)
{
    for (let i = 1;i < arguments.length; i++)
    {
        arr[arr.length+i-1] = arguments[i];
    }
    return arr.length;
}
