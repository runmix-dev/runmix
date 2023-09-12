import renderer from 'react-test-renderer'
import Link from '../../../src/components/testDemo/Link'

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  )

  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  renderer.act(() => {
    tree.props.onMouseEnter()
  })
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()

  renderer.act(() => {
    tree.props.onMouseLeave()
  })
  tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})