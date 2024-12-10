import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ListBlogs from '../../views/ListBlogs.vue'

describe('ListBlogs', () => {
  it('should render blog list', async () => {
    const wrapper = mount(ListBlogs)
    
    // Mock blog data
    const mockBlogs = [
      { id: 1, title: 'Test Blog 1', content: 'Content 1' },
      { id: 2, title: 'Test Blog 2', content: 'Content 2' }
    ]

    // Set component data
    await wrapper.setData({ blogs: mockBlogs })

    // Check if blogs are rendered
    const blogItems = wrapper.findAll('.blog-item')
    expect(blogItems.length).toBe(mockBlogs.length)
  })

  it('should show loading state', async () => {
    const wrapper = mount(ListBlogs)
    
    // Set loading state
    await wrapper.setData({ loading: true })
    
    // Check if loading message is visible
    expect(wrapper.find('.loading').exists()).toBe(true)
  })

  it('should show error message when no blogs', async () => {
    const wrapper = mount(ListBlogs)
    
    // Set empty blogs array
    await wrapper.setData({ blogs: [] })
    
    // Check if "no blogs" message is shown
    expect(wrapper.text()).toContain('No blogs available')
  })
})
