export const validateContactName = (name) => {
    const regEx = /^[A-Z][a-z]{1,} [A-Z][a-z]{1,}$/;
    return regEx.test(name);
}

export const validateContactPnone = (phone) => {
    const regEx = /^(\s*)?(\+)?([- ()+]?\d[- ()+]?){10,14}(\s*)?$/;
    return regEx.test(phone);
}