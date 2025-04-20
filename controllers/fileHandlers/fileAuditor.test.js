const { uploadBytes, fileSizeValid, renameFiles } = require('./fileAuditors')

it('uploadBytes correctly adds file sizes', () => {
    const files = [{ size: 43234 }, { size: 653456 }]
    expect(uploadBytes(files)).toEqual(696690)

    const files2 = [{size: 55323}, {size: 23342}, {size: 8678645}]
    expect(uploadBytes(files2)).toEqual(8757310)
})

it("fileSizeValid correctly evaluates whether the user has room for their upload", () =>{
    const user = {usedStorage: 1000000000} //1 gb
    const uploadSize = 696690
    expect(fileSizeValid(user, uploadSize)).toBe(true)

    const user2 = {usedStorage: 9999999900}
    const uploadSize2 = 8757310
    expect(fileSizeValid(user2, uploadSize2)).toBe(false)
})